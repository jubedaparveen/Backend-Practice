'use client'
import { Provider } from "react-redux";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { store } from "./redux/store";


// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-Montserrat">
        <Provider store={store}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
