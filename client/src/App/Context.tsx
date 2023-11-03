import axios from "axios";
import React, { PropsWithChildren } from "react";

const AppContext = React.createContext("" as any);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [values, setValue] = React.useState({
    about: {},
    arr: [],
  });

  const getAbout = async () => {
    // setSpin(true);
    const { data } = await axios.get("http://localhost:8080/api/about");
    if (data.success) {
      const filterLanguage = data.allAbout.filter((d: any) => {
        return (
          d.language.toLowerCase() === localStorage.getItem("web_set_language")
        );
      });
      setValue({
        ...values,
        about: {
          ...filterLanguage[0],
        },
      });
    }
  };

  React.useEffect(() => {
    getAbout();
  }, []);

  return (
    <AppContext.Provider value={[values, setValue]}>
      {children}
    </AppContext.Provider>
  );
};

const ContextValue = () => {
  return React.useContext(AppContext);
};
export { ContextValue };
