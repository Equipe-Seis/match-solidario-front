import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.seuapp.app',
  appName: 'MatchSolidario',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 5000,    
      launchAutoHide: false,       
      backgroundColor: '#ffffff',  
      showSpinner: false,
      androidScaleType: 'CENTER_CROP'
    }
  }
};

export default config;
