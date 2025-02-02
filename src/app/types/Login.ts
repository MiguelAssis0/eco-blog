export interface login {
    username?: string;
    password?: string;
    error?: string;
    onLogin: () => void; // Add this line
  }