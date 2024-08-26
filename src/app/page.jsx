'use client'  

import { Form } from "@/components/Form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
      <Form title='Iniciar Sesión' onSubmit={() => {}}
        description= 'Formulario para iniciar sesión'>

        <Form.Input
        label="Correo"
        name = "email"
        placeholder = "Ingresa tu correo..."
        
        />

        <Form.Footer
          description='Te olvidaste de tu contraseña?'
          link= '/forget-password'
          textLink = 'Recuperar contraseña'
        />

        <Form.Footer
          description='Aun no tienes cuenta?'
          link= '/register'
          textLink = 'Registrarte'
        />
      </Form>
    </main>
  );
}
