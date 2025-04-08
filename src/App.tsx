import React, { useState } from "react";
import { generateItems } from "./utils";
import { useCallback, useMemo } from "./@lib";
import {
  NotificationProvider,
  ThemeProvider,
  UserProvider,
} from "./@lib/context";
import { Notification, User } from "./types/common";
import {
  NotificationContextType,
  ThemeContextType,
  UserContextType,
} from "./types/context";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState(() => generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [setNotifications],
  );

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const removeNotification = useCallback(
    (id: number) => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    },
    [setNotifications],
  );

  const themeContextValue: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  const userContextValue: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  const notificationContextValue: NotificationContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <ThemeProvider value={themeContextValue}>
      <UserProvider value={userContextValue}>
        <NotificationProvider value={notificationContextValue}>
          <div
            className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
          >
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList items={items} onAddItemsClick={addItems} />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
            <NotificationSystem />
          </div>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
