// src/react-app-env.d.ts
/// <reference types="react-scripts" />

// Add Material-UI type declarations
declare module '@mui/system' {
    import * as CSS from 'csstype';
  
    export interface SxProps {
      sx?: CSS.Properties;
    }
  }
  