import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import PublicacionesPage from './pages/PublicacionesPage';
import { obtenerSesion } from './services/sesion';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const RutaProtegida = ({ children }: { children: React.ReactElement }) => {
  return obtenerSesion() ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/publicaciones"
          element={
            <RutaProtegida>
              <PublicacionesPage />
            </RutaProtegida>
          }
        />
        <Route path="/" element={<Navigate to="/publicaciones" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;