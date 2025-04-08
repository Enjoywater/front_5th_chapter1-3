import {
  NotificationContextType,
  ThemeContextType,
  UserContextType,
} from "../../types/context";
import { createCustomContext } from "../hooks/createCustomContext";

export const [ThemeProvider, ThemeContext, useThemeContext] =
  createCustomContext<ThemeContextType>();
export const [UserProvider, UserContext, useUserContext] =
  createCustomContext<UserContextType>();
export const [
  NotificationProvider,
  NotificationContext,
  useNotificationContext,
] = createCustomContext<NotificationContextType>();
