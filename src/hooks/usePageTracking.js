import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Certifique-se de que axios está instalado

// Função auxiliar simples para obter informações básicas do navegador e dispositivo
const getClientInfo = () => {
  const ua = navigator.userAgent;
  let browserName = 'Desconhecido';
  let deviceType = 'Desktop'; // Assume Desktop por padrão

  // Detecção básica de navegador
  if (ua.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (ua.indexOf("SamsungBrowser") > -1) {
    browserName = "Samsung Internet";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (ua.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
  } else if (ua.indexOf("Edge") > -1) {
    browserName = "Edge";
  } else if (ua.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (ua.indexOf("Safari") > -1) {
    browserName = "Safari";
  }

  // Detecção básica de dispositivo
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = "Tablet";
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    deviceType = "Mobile";
  }

  return { browserName, deviceType };
};

const usePageTracking = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const entryTime = startTimeRef.current;

    // Se o caminho mudou desde a última vez
    if (currentPath !== previousPathRef.current) {
      const endTime = Date.now();
      const timeSpentSeconds = Math.round((endTime - entryTime) / 1000);
      const previousPath = previousPathRef.current;
      const { browserName, deviceType } = getClientInfo();

      // Envia dados da PÁGINA ANTERIOR para o backend
      if (previousPath && timeSpentSeconds > 0) { // Não envia se for a primeira página ou tempo 0
        axios.post('/api/track', {
          deviceType,
          browserName,
          visitedPage: previousPath,
          timeSpentSeconds,
        }).catch(error => {
          console.error('Erro ao enviar dados de rastreamento:', error);
        });
      }

      // Atualiza refs para a página ATUAL
      startTimeRef.current = Date.now();
      previousPathRef.current = currentPath;
    }

    // TODO: Adicionar lógica para 'beforeunload' ou 'visibilitychange' para a última página
    // Esta parte é mais complexa e pode ser adicionada depois.

  }, [location.pathname]); // Executa quando o pathname muda

  // Efeito para lidar com a saída do usuário (tentativa)
  useEffect(() => {
    const handleUnload = () => {
      const endTime = Date.now();
      const timeSpentSeconds = Math.round((endTime - startTimeRef.current) / 1000);
      const lastPath = previousPathRef.current; // A última página registrada
      const { browserName, deviceType } = getClientInfo();

      // Tenta enviar os dados da última página de forma síncrona ou com sendBeacon
      // Nota: Isso não é 100% garantido
      if (lastPath && timeSpentSeconds > 0) {
        const data = {
          deviceType,
          browserName,
          visitedPage: lastPath,
          timeSpentSeconds,
        };
        // Usar navigator.sendBeacon se disponível (melhor para unload)
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
          navigator.sendBeacon('/api/track', blob);
        } else {
          // Fallback para XHR síncrono (pode ser bloqueado ou causar lentidão)
          try {
            const request = new XMLHttpRequest();
            request.open('POST', '/api/track', false); // false torna síncrono
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(data));
          } catch (error) {
            console.error('Erro ao enviar dados de rastreamento no unload (sync):', error);
          }
        }
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []); // Executa apenas uma vez na montagem/desmontagem

};

export default usePageTracking;