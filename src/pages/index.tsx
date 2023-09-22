import { useState } from 'react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const loginWithGoogle = () => {
    // Abre una ventana emergente y apunta al endpoint de Google OAuth en tu servidor
    const googleWindow = window.open('http://localhost:3000/auth/google', 'googleWindow', 'width=500, height=600');
  
    // Verifica si googleWindow es null
    if (!googleWindow) {
      console.error('No se pudo abrir la ventana emergente');
      return;
    }
  
    // Escucha el mensaje que llega de la ventana emergente
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:3000') return;
      
      // Aquí asumimos que el mensaje que llega es un objeto que tiene una propiedad 'authenticated'
      const { authenticated } = event.data;
      
      if (authenticated) {
        setIsAuthenticated(true);
        googleWindow.close();
      }
    });
  };
  

  return (
    <main className="flex justify-center items-center h-screen">
      {isAuthenticated ? (
        <div>
          <p>Usuario logueado con éxito</p>
        </div>
      ) : (
        <button onClick={loginWithGoogle} className="bg-blue-500 text-white p-4 rounded">
          Iniciar sesión con Google
        </button>
      )}
    </main>
  );
}
