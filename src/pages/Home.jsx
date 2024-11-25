import React, {useEffect, useState} from 'react';
import {Layout, Typography} from 'antd';
import logo from '../images/logo_monta_ai.png';
import Peca from "../components/Peca";

const {Header, Content} = Layout;
const {Title, Text} = Typography;

const Home = () => {
    const [computador, setComputador] = useState({});
    const [total, setTotal] = useState(0.0);
    const [componentes, setComponentes] = useState([
        {nome: 'Processador', peca: {}},
        {nome: 'Placa de Vídeo', peca: {}},
        {nome: 'Placa Mãe', peca: {}},
        {nome: 'Memória RAM', peca: {}},
        {nome: 'Armazenamento', peca: {}},
        {nome: 'Fonte', peca: {}},
        {nome: 'Gabinete', peca: {}},
        {nome: 'Pasta Térmica', peca: {}},
        {nome: 'Ventoinha', peca: {}},
        {nome: 'Cooler para Processador', peca: {}}
    ]);

    const adicionarPeca = (i, nome, retorno) => {
        const index = componentes.map(e => e.nome).indexOf(nome);
        const nComponentes = [...componentes];
        nComponentes[index].peca=retorno;
        setTotal(total + retorno.price);
        setComponentes(nComponentes);
    };

    const removerPeca = (nome) => {
        const nComponentes = [...componentes];
        const index = nComponentes.map(e => e.nome).indexOf(nome);
        setTotal((current)=>{
            let newTotal = total - nComponentes[index].peca.price;
            if(newTotal <= 2.2737367544323206e-13 || isNaN(newTotal)){
                newTotal = 0
            }
            return newTotal;
        });
        nComponentes[index].peca = {};
        setComponentes(nComponentes);
    };

    const setPecaComputador = (nome, computador, peca) => {
        const newComputador = {...computador}
        newComputador[nome] = peca;
        if (peca === null) {
            delete newComputador[nome];
        }
        setComputador(newComputador);
    }

    const calcularPotencia = (cpuTdp, gpuTdp) => {
        return Math.floor(1.5 * parseInt(cpuTdp) + 1.5 * parseInt(gpuTdp) + 100);
    }

    return (
        <Layout style={{backgroundColor: '#282838', minHeight: '100vh'}}>
            <Header
                style={{
                    backgroundColor: '#010102',
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <img
                    src={logo}
                    alt="Logo Monta Aí"
                    style={{
                        height: '40px',
                        cursor: 'pointer',
                    }}
                />
                <div style={{color: '#e8e5e7', fontSize: '14px'}}>
                    <Text style={{marginRight: '10px'}}>Monte o seu PC sob medida!</Text>
                </div>
            </Header>
            <div
                style={{
                    margin: '35px',
                    textAlign: 'right',
                    color: '#e8e5e7',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    fontWeight: 'bold',
                    fontSize: '26px'
                }}
            >
                <p style={{margin:'0'}}>Selecione os componentes para montar o seu PC:</p>
                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                <p style={{margin:'0'}}>TOTAL: <span style={{color:'#08a003'}}>R$ {total.toFixed(2)}</span></p>
                    {total>0 ? <p style={{margin:'0', fontSize: '18px'}}>ou 10x R$ {(total/10).toFixed(2)}</p> : <></>}
                </div>
            </div>
            <Content style={{padding: '0 20px 20px 20px'}}>
                <Peca computador={computador} item={computador.case} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[6]}
                      nome="Gabinete"
                      api="case"/>
                <Peca computador={computador} item={computador.cpu} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[0]}
                      nome="Processador" api="cpu"/>
                <Peca computador={computador} item={computador.motherboard} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[2]}
                      nome="Placa Mãe" api="motherboard"/>
                <Peca computador={computador} item={computador.memory} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[3]}
                      nome="Memória RAM" api="memory"/>
                <Peca computador={computador} item={computador.gpu} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[1]}
                      nome="Placa de Vídeo" api="gpu"/>
                <Peca computador={computador} item={computador.storage} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[4]}
                      nome="Armazenamento" api="storage"/>

                <div
                    style={{
                        marginRight: '16px',
                        textAlign: 'right',
                        color: '#e8e5e7',
                        fontWeight: 'bold',
                        fontSize: '24px'
                    }}
                >{computador?.cpu?.tdp && computador?.gpu?.tdp ? <p style={{margin:'0'}}>Potência recomendada para
                    Fonte: {calcularPotencia(computador.cpu.tdp, computador.gpu.tdp)} W</p> : <></>}</div>
                    <Peca computador={computador} item={computador.powersupply} setPecaComputador={setPecaComputador}
                          adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[5]}
                          nome="Fonte"
                          api="powersupply"/>
                    <Peca computador={computador} item={computador.cpucooler} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[9]}
                      nome="Cooler para Processador" api="cpucooler"/>
                <Peca computador={computador} item={computador.fan} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[8]}
                      nome="Ventoinha" api="fan"/>
                <Peca computador={computador} item={computador.thermalpaste} setPecaComputador={setPecaComputador}
                      adicionarPeca={adicionarPeca} removerPeca={removerPeca} componente={componentes[7]}
                      nome="Pasta Térmica" api="thermalpaste"/>

            </Content>
        </Layout>
    );
};

export default Home;
