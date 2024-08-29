"use client";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFech";
import { Form } from "@/components/Form";
import { useSearchParams } from "next/navigation";


export default function ChangePasswordPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const searchParams = useSearchParams();
  const authFetch = useAuthFetch();

  const changePassword = async (formData) => {
    startLoading();
    try {
      const token = searchParams.get("token");

      const options = {
        headers: {
          token,
        },
      };

      await authFetch({
        endpoint: "change-password",
        redirectRoute: "/",
        formData,
        options,
      });
    } catch (error) {
      console.error("Error al cambiar tu contraseña:", error);
    } finally {
      finishLoading();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
      <Form
        title="Cambiar tu contraseña"
        description="Formulario para cambiar tu contraseña"
        onSubmit={changePassword}
      >
        <div className="my-[10px] flex flex-col gap-4">
          <Form.Input
            placeholder="Ingresa tu nueva contraseña"
            label="Contraseña"
            name="newPassword"
            type="password"
          />
          <Form.Input
            placeholder="Repite tu contraseña..."
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
          />
        </div>
        <Form.SubmitButton
          buttonText="Cambiar Contraseña"
          isLoading={isLoading}
        />
      </Form>
    </main>
  );
}