import React, {useEffect, useState} from 'react';
import {Button, Col, Layout, List, Row, Select, Typography} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import ModalPecas from '../components/ModalPecas';
import logo from '../images/logo_monta_ai.png';
import {Computer} from "../models/Computer";
import {Case} from "../models/Case";
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
    ]);

    const adicionarPeca = (i, retorno) => {
        const nComponentes = [...componentes];
        nComponentes[i].peca = retorno;
        setTotal(total + retorno.valor);
        setComponentes(nComponentes);
    };

    const removerPeca = (i) => {
        const nComponentes = [...componentes];
        setTotal(total - nComponentes[i].peca.valor);
        nComponentes[i].peca = {};
        setComponentes(nComponentes);
    };

    const setPecaComputador = (nome,computador,peca)=>{
        const newComputador = {...computador}
        newComputador[nome] = peca;
        if(peca === null){
            delete newComputador[nome];
        }
        console.log('nome: ',nome,'computador: ',computador,'peca: ',peca);
        setComputador(newComputador);
    }

    const calcularPotencia=(cpuTdp, gpuTdp)=>{
        console.log(parseInt(cpuTdp) + parseInt(gpuTdp))
        return 2*parseInt(cpuTdp) + parseInt(gpuTdp) + 150;
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
                    color: '#e8e5e7',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}
            >
                Selecione os componentes para montar o seu PC:
            </div>
            {/* Content */}
            <Content style={{padding: '20px'}}>
                <Peca computador={computador} item={computador.case} setPecaComputador={setPecaComputador} nome="Gabinete" api="case" />
                <Peca computador={computador} item={computador.cpu} setPecaComputador={setPecaComputador} nome="Processador" api="cpu" />
                <Peca computador={computador} item={computador.motherboard} setPecaComputador={setPecaComputador} nome="Placa Mãe" api="motherboard" />
                <Peca computador={computador} item={computador.memory} setPecaComputador={setPecaComputador} nome="Memória" api="memory" />
                <Peca computador={computador} item={computador.gpu} setPecaComputador={setPecaComputador} nome="Placa Gráfica" api="gpu" />
                <Peca computador={computador} item={computador.storage} setPecaComputador={setPecaComputador} nome="Armazenamento" api="storage" />
                <Peca computador={computador} item={computador.powersupply} setPecaComputador={setPecaComputador} nome="Fonte" api="powersupply" />
                <Peca computador={computador} item={computador.cpucooler} setPecaComputador={setPecaComputador} nome="Cooler para Processador" api="cpucooler" />
                <Peca computador={computador} item={computador.fan} setPecaComputador={setPecaComputador} nome="Ventoinha" api="fan" />
                <Peca computador={computador} item={computador.thermalpaste} setPecaComputador={setPecaComputador} nome="Pasta Térmica" api="thermalpaste" />
                <div
                    style={{
                        marginTop: '20px',
                        textAlign: 'right',
                        color: '#e8e5e7',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {computador?.cpu?.tdp && computador?.gpu?.tdp ? <p>Potência recomendada para Fonte: {calcularPotencia(computador.cpu.tdp,computador.gpu.tdp)} W</p> : <>{calcularPotencia(computador?.cpu?.tdp,computador?.gpu?.tdp)}</>}
                    <p>Total: R$ {total.toFixed(2)}</p>
                </div>
            </Content>
        </Layout>
    );
};

export default Home;
