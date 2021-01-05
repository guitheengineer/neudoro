import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ComponentType, ReactElement, ReactNode } from "react";
import { store } from "store";

const AllProviders = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const customRender = (ui: ReactElement, options?: Record<string, unknown>) =>
  render(ui, { wrapper: AllProviders as ComponentType, ...options });

export * from "@testing-library/react";

export { customRender as render };
