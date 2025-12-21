import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import i18n from "../i18n.js";
import API_BASE_URL from "../apiConfig.js";
import { withLang } from "../utils/withLang.js";

const useSubcategories = ({ category_id }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const langParams = useMemo(() => withLang(), [i18n.language]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!category_id) return;

            setLoading(true); 
            try {
                const queryString = new URLSearchParams(langParams).toString();
                const response = await axios.get(
                    `${API_BASE_URL}/categories/${category_id}/get_subcategories/?${queryString}`
                );
                setSubcategories(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [category_id, langParams]);

    return { subcategories, loading, error };
};

export default useSubcategories;
