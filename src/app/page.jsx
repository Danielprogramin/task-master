"use client";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFech";
import { Form } from "@/components/Form";


export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const login = async (formData) => {
    startLoading();
    try {
      await authFetch({
        endpoint: "login",
        redirectRoute: "/home",
        formData,
      });
    } catch (error) {
      // Manejar errores si es necesario, por ejemplo, mostrar un mensaje adicional
      console.error("Error during login:", error);
    } finally {
      finishLoading();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
      <Form
        title="Iniciar Sesión"
        onSubmit={login}
        description="Formulario para iniciar sesión"
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
            name="password" // Corregido aquí
            type="password"
          />
        </div>
        <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading} />
        <Form.Footer
          description="Te olvidaste de tu contraseña?"
          link="/forget-password"
          textLink="Recuperar contraseña"
        />
        <Form.Footer
          description="Aun no tienes cuenta?"
          link="/register"
          textLink="Registrarte"
        />
      </Form>
    </main>
  );
}