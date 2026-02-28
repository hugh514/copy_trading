"use client";

import { useState } from "react";
import { UserTable } from "@/components/users/user-table";
import { CreateUserModal } from "@/components/users/create-user-modal";
import { Button } from "@/components/ui/button";
import { Plus, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/src/hooks/useUsers";
import { User } from "@/src/types/user";

export default function UsuariosPage() {
  const { users, isLoading, createUser, toggleStatus, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const userList = Array.isArray(users) ? users : [];

  const filteredUsers = userList.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleResetPassword = (id: string) => {
    console.log("Reset password for:", id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Gestão de Usuários
          </h1>
          <p className="text-muted-foreground mt-1">
            Administre os acessos e permissões dos usuários do sistema.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        onToggleStatus={(id, isActive) => toggleStatus.mutate({ id, isActive })}
        onDelete={(id) => deleteUser.mutate(id)}
        onEdit={handleEdit}
        onResetPassword={handleResetPassword}
      />

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          createUser.mutate(data);
          setIsModalOpen(false);
        }}
        isLoading={createUser.isPending}
      />
    </div>
  );
}
