"use client";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFech";
import { Form } from "@/components/Form";

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const register = async (formData) => {
    startLoading();
    await authFetch({
      endpoint: "register",
      redirectRoute: "/home",
      formData,
    });
    finishLoading();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
      <Form
        title="Registrate"
        onSubmit={register}
        description="Formulario para crear una cuenta"
      >
        <div className="my-[10px] flex flex-col gap-4">
          <Form.Input
            label="Correo"
            name="email"
            placeholder="Ingresa tu correo..."
          />
          <Form.Input
            placeholder="Ingresa tu contraseña..."
            label="Contraseña"
            name="pasword"
            type="password"
          />
          <Form.Input
            placeholder="Confirma tu contraseña..."
            label="Confirmar contraseña"
            name="confirmpasword"
            type="password"
          />
        </div>
        <Form.SubmitButton buttonText="Crea tu cuenta" isLoading={isLoading} />
        <Form.Footer
          description="Ya tienes un cuenta?"
          textLink="Inicia sesión"
          link="/"
        />
      </Form>
    </main>
  );
}
