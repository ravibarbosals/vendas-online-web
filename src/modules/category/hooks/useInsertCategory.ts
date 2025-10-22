import { useState } from "react"

export const userInsertCategory = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);


    const insertCategory = () => {
        setLoading(true);

    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };


    return {
        name,
        handleChangeName,
        insertCategory,
        loading,
    };
};