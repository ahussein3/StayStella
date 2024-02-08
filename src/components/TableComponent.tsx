import React, { useEffect, useState, ReactNode } from "react";

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  title: string;
  render?: (current: T) => ReactNode;
};

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
  };


const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>) => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      // set initial value
      const mediaWatcher = window.matchMedia("(max-width: 425px)");
      setIsMobile(mediaWatcher.matches);
  
      //watch for updates
      function updateIsNarrowScreen(e: MediaQueryListEvent) {
        setIsMobile(e.matches);
      }
      mediaWatcher.addEventListener("change", updateIsNarrowScreen);
  
      // clean up after ourselves
      return function cleanup() {
        mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
      };
    }, []);
  
    const desktopView = (
      <>
        <thead>
          {columns.map(({ key, title }) => (
            <th key={String(key)}>{title}</th>
          ))}
        </thead>
        <tbody>
        {data.map((currentRow) => (
          <tr>
            {columns.map(({ key, render }) => (
              <td key={String(key)}>
                <>{render ? render(currentRow) : currentRow[key]}</>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </>
    );
  
    const mobileView = (
      <>
      <tbody>
        {data.map((currentRow) => (
          <tr>
            {columns.map(({ key, title, render }) => (
              <div>
                <th>{title}</th>
                <td key={String(key)}>
                  <>{render ? render(currentRow) : currentRow[key]}</>
                </td>
              </div>
            ))}
          </tr>
        ))}
        </tbody>
      </>
    );
  
    return <table>{isMobile ? mobileView : desktopView}</table>;
  };

  export default Table;