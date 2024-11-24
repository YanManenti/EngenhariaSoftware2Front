import {Button, Col, Row, Select} from "antd";
import ModalPecas from "./ModalPecas";
import {Case} from "../models/Case";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Typography} from "antd";
const { Title } = Typography;

function Peca({computador, item, api, nome, setPecaComputador}) {

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
        <Row style={{width: '100%'}} align="middle">
            <Col span={6}>
                <Title
                    level={5}
                    style={{
                        color: '#e8e5e7',
                        margin: 0,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        if (!item?.id) {
                            ModalPecas({peca: item.Name, recebePeca: (valor) => adicionarPeca(index, valor)});
                        }
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#2b86de'}
                    onMouseLeave={(e) => e.target.style.color = '#e8e5e7'}
                >
                    {nome}
                </Title>
            </Col>
            {!item?.peca?.descricao ? (
                <Col span={18} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Select
                        style={{width: '340'}}
                        showSearch
                        optionFilterProp="label"
                        placeholder={`Selecione o modelo de ${nome}`}
                        onChange={(_, option) => setPecaComputador(`${api}`,computador,option)}
                        options={options}
                        allowClear={true}
                        onClear={() => setPecaComputador(`${api}`,computador,null)}
                    />
                    <ModalPecas
                        peca={nome}
                        recebePeca={(valor) => adicionarPeca(index, valor)}
                    >
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            style={{
                                backgroundColor: '#2b86de',
                                borderColor: '#2b86de',
                                color: '#e8e5e7',
                                transition: 'background-color 0.3s ease',
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
                    <Col span={12}>
                      <span style={{color: '#e8e5e7'}}>
                        {item.peca.descricao}
                      </span>
                    </Col>
                    <Col span={4} style={{textAlign: 'right'}}>
                      <span style={{color: '#2b86de', fontWeight: 'bold'}}>
                        R$ {item.peca.valor.toFixed(2)}
                      </span>
                    </Col>
                    <Col span={2} style={{textAlign: 'right'}}>
                        <Button
                            type="default"
                            icon={<MinusOutlined/>}
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
                            onClick={() => removerPeca(index)}
                        />
                    </Col>
                </>
            )}
        </Row>
    </div>
}

export default Peca;