import { useEffect } from "react";

const useTitle = (title: string) => {
    useEffect(() => {
        document.title = "DDUV | " + title;
    }, [title]);
};

export default useTitle;
