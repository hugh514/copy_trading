"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Key, Mail, Cpu } from "lucide-react";
import { User } from "@/src/types/user";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UserTableProps {
  users: User[];
  onToggleStatus: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (user: User) => void;
  onResetPassword: (id: string) => void;
}

export function UserTable({
  users,
  onToggleStatus,
  onDelete,
  onEdit,
  onResetPassword,
}: UserTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Perfil</TableHead>
            <TableHead>Último Acesso</TableHead>
            <TableHead>Atuando Em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
              >
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={(checked) =>
                        onToggleStatus(user.id, checked)
                      }
                    />
                    <Badge variant={user.isActive ? "success" : "destructive"}>
                      {user.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-neutral-100">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${user.email}`}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{user.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {user.role.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-neutral-600">
                  {user.lastLogin
                    ? formatDistanceToNow(new Date(user.lastLogin), {
                        addSuffix: true,
                        locale: ptBR,
                      })
                    : "Nunca"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.tradingPairs && user.tradingPairs.length > 0 ? (
                      user.tradingPairs.map((pair) => (
                        <Badge
                          key={pair}
                          variant="secondary"
                          className="text-[10px] py-0 px-1"
                        >
                          {pair}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-[10px] text-muted-foreground italic">
                        Nenhum
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onResetPassword(user.id)}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        <span>Resetar Senha</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(user.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
