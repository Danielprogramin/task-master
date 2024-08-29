"use client";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFech";
import { Form } from "@/components/Form";


export default function RegisterPage() { 
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const register = async (formData) => {
    startLoading();
    try {
      await authFetch({
        endpoint: "register",
        redirectRoute: "/home",
        formData,
      });
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      finishLoading();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
      <Form
        title="Regístrate"
        onSubmit={register}
        description="Formulario para crear una cuenta"
      >
        <div className="my-[10px] flex flex-col gap-4">

          <Form.Input
            label="Nombre"
            name="name"
            placeholder="Ingresa nombre a usar..."
          />
          <Form.Input
            label="Correo"
            name="email"
            placeholder="Ingresa tu correo..."
          />
          <Form.Input
            placeholder="Ingresa tu contraseña..."
            label="Contraseña"
            name="password" 
            type="password"
          />
          <Form.Input
            placeholder="Confirma tu contraseña..."
            label="Confirmar contraseña"
            name="confirmpassword" 
            type="password"
          />
        </div>
        <Form.SubmitButton buttonText="Crea tu cuenta" isLoading={isLoading} />
        <Form.Footer
          description="¿Ya tienes una cuenta?"
          textLink="Inicia sesión"
          link="/"
        />
      </Form>
    </main>
  );
}