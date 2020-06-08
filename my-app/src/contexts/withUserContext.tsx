import React from "react";
import UserContext from "./UserContext";

type WithUserProps = {
    userId: string;
};

const withUserContext = <P extends WithUserProps, C>(WrappedComponent: React.JSXElementConstructor<P> & C) => {
  const WithUserContextComponent: React.FC<JSX.LibraryManagedAttributes<C, Omit<P, "userId">>> = (props) => {
    return (
      <UserContext.Consumer>
          {
              (context) => <WrappedComponent {...props as any} userId={context.userId} />
          }
      </UserContext.Consumer>
    );
  };

  WithUserContextComponent.displayName = `WithUserContext(${getDisplayName(
    WrappedComponent
  )})`;

  return WithUserContextComponent;
};

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }

export default withUserContext;
