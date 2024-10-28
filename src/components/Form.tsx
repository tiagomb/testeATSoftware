import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, IconButton, TextField, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const formSchema = z.object({
  timestamp: z.string().min(1, "A data é obrigatória"),
  react: z.number().min(0, "React deve ser um número não negativo"),
  angular: z.number().min(0, "Angular deve ser um número não negativo"),
  vue: z.number().min(0, "Vue deve ser um número não negativo"),
});

type FormData = z.infer<typeof formSchema>;

export default function Form(){
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (newRecord: FormData) => {
      const response = await fetch('http://localhost:3001/frameworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar registro');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['chartData']);
      reset();
      setOpen(false);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Box>
      <Box>
        <IconButton onClick={() => setOpen(true)} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
            position: 'relative',
            zIndex: 10,
          }}
        >
          <Typography variant="h6" mb={2}>Adicionar Registro</Typography>
          <TextField
            label="Timestamp"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('timestamp')}
            error={!!errors.timestamp}
            helperText={errors.timestamp?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="React"
            type="number"
            {...register('react', { valueAsNumber: true })}
            error={!!errors.react}
            helperText={errors.react?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Angular"
            type="number"
            {...register('angular', { valueAsNumber: true })}
            error={!!errors.angular}
            helperText={errors.angular?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vue"
            type="number"
            {...register('vue', { valueAsNumber: true })}
            error={!!errors.vue}
            helperText={errors.vue?.message}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Adicionando...' : 'Adicionar Registro'}
          </Button>
          {mutation.isError && <Typography color="error">Erro ao adicionar o registro. Tente novamente.</Typography>}
        </Box>
      </Modal>
    </Box>
  );
};