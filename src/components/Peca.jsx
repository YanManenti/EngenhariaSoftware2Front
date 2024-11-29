import {Button, Col, Row, Select} from "antd";
import ModalPecas from "./ModalPecas";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Typography} from "antd";
const { Title } = Typography;


import Link from '../images/link.svg'



function Peca({computador, item, api, nome, componente, setPecaComputador, adicionarPeca, removerPeca}) {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const computerBody = Object.keys(computador).length ? {...computador} : {}
        for(const key in computador) {
            if(computador[key] === undefined){
                delete computador[key];
            }
        }
        const fetchData = async () => {
            const data = fetch(`http://localhost:8081/api/${api}/all?value=`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json;"
                },
                body: JSON.stringify(computerBody)
            })
                .then((res) => res.json())
                .then((res) => {
                    return res.map((item) => {
                        return {...item, id: item.id, label: item.name, value: item.name};
                    });
                });
            setOptions(await data);
        }
        fetchData().catch((err) => console.log(err));
    },[setPecaComputador]);

    return <div
        style={{
            backgroundColor: '#282838',
            borderBottom: '1px solid #333347',
            padding: '15px',
        }}>
        <Row style={{ width: '100%' }} align="middle">
            <Col span={3}>
                <Title
                    level={5}
                    style={{
                        color: '#e8e5e7',
                        margin: 0,
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#2b86de'}
                    onMouseLeave={(e) => e.target.style.color = '#e8e5e7'}
                >
                    {nome}
                </Title>
            </Col>
            {componente?.peca?.price === undefined ? (
                <Col span={21} style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'center', gap: '10px' }}>
                    <Select
                        style={{width: '340'}}
                        showSearch
                        optionFilterProp="label"
                        placeholder={`Selecione o modelo de ${nome}`}
                        onChange={(_, option) => setPecaComputador(`${api}`,computador,option)}
                        options={options}
                        allowClear={true}
                        virtual={true}
                        onClear={() => {setPecaComputador(`${api}`,computador,null);}}
                    />
                    <ModalPecas
                        peca={nome}
                        nome={computador[api]?.name}
                        recebePeca={(valor) => adicionarPeca(computador[api]?.name, nome,valor)}
                    >
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{
                                backgroundColor: '#2b86de',
                                borderColor: '#2b86de',
                                color: '#e8e5e7',
                                transition: 'background-color 0.3s ease',
                                width: '275px'
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#1a6fa2')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#2b86de')}
                        >
                            Escolher {nome}
                        </Button>
                    </ModalPecas>
                </Col>
            ) : (
                <>
                    <Col span={2} >
                        <img style={{borderRadius: '10px'}} src={componente.peca.thumbnail} alt="thumbnail"/>
                    </Col>
                    <Col span={13} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                      <span style={{color: '#e8e5e7', fontWeight: 'bold', cursor: 'pointer'}}
                            onClick={() => window.open(componente.peca?.permalink, '_blank')}>
                        {componente.peca.title}<
                          img
                          src = {Link}
                          style={{height: '25px',width:'25px'}}
                      />
                      </span>
                        <span style={{color: '#e8e5e7'}}>
                        Status: {componente.peca?.condition==="new" ? "Novo" : "Usado"}
                      </span>
                        <span style={{color: '#e8e5e7'}}>
                            Origem: {componente.peca.address.city_name}
                      </span>
                    </Col>
                    <Col span={5} style={{textAlign: 'right'}}>
                      <span style={{color: '#2b86de', fontWeight: 'bold', fontSize: '30px'}}>
                        R$ {componente.peca.price?.toFixed(2)}
                      </span>
                    </Col>
                    <Col span={1} style={{ textAlign: 'right' }}>
                        <Button
                            type="default"
                            icon={<MinusOutlined />}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#e8e5e7',
                                borderColor: '#333347',
                                transition: 'background-color 0.3s ease, color 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#d13434';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#e8e5e7';
                            }}
                            onClick={() => {removerPeca(nome);setPecaComputador(`${api}`,computador,null);}}
                        />
                    </Col>
                </>
            )}
        </Row>
    </div>
}

export default Peca;