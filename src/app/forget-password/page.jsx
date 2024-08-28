"use client";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFech";
import { Form } from "@/components/Form";

export default function ForgetPasswordPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const forgetpassword = async (formData) => {
    startLoading();
    try {
      await authFetch({
        endpoint: "forget-password",
        formData,
      });
    } catch (error) {
      console.error("Error during password recovery:", error);
    } finally {
      finishLoading();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
      <Form
        title="Recuperar contraseña"
        description="Formulario para recuperar tu contraseña"
        onSubmit={forgetpassword}
      >
        <div className="my-[10px] flex flex-col gap-4">
          <Form.Input
            label="Correo"
            name="email"
            placeholder="Ingresa tu correo..."
          />
        </div>
        <Form.SubmitButton buttonText="Recuperar contraseña" isLoading={isLoading} />
        <Form.Footer
          description="Volver al inicio"
          textLink="Inicio"
          link="/"
        />
      </Form>
    </main>
  );
}