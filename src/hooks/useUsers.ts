import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { CreateUserDto } from "../types/user";
import { useToast } from "@/components/ui/use-toast";

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const createUser = useMutation({
    mutationFn: (data: CreateUserDto) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso!",
        description: "Usuário criado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar usuário",
        description:
          error.response?.data?.message || "Ocorreu um erro inesperado.",
      });
    },
  });

  const toggleStatus = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      userService.toggleStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Status atualizado!",
        description: "O status do usuário foi alterado.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description:
          error.response?.data?.message || "Ocorreu um erro inesperado.",
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário excluído",
        description: "O usuário foi removido do sistema.",
      });
    },
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    createUser,
    toggleStatus,
    deleteUser,
  };
};
