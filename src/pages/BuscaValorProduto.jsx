import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BuscarValorProduto = ({ name, category, guardaValor }) => {
    const [valor, setValor] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchValor = async () => {
            if (!name) return;

            console.log(`url https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(name)}&category=${category}&sort=price_asc`);
            console.log('category',category);
            
            try {
                const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(name)}&category=${category}&sort=price_asc`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar valor: ${response.statusText}`);
                }
                const result = await response.json();
                console.log(result.results);
                
                guardaValor(result.results[0].price);
                setValor(result.results[0].price);
            } catch (error) {
                console.error('Erro ao buscar valor do produto:', error);
                setValor(0);
            } finally {
                setLoading(false);
            }
        };

        fetchValor();
    }, [name]);

    if (loading) {
        return <span>Carregando...</span>;
    }

    return <span>R$ { valor?.toFixed(2) || 'N/A'}</span>;
};

BuscarValorProduto.propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    guardaValor: PropTypes.func.isRequired,
};

export default BuscarValorProduto;