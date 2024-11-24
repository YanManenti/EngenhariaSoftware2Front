import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Table, Button, Input, Popover, Checkbox } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import BuscarValorProduto from './BuscaValorProduto';

function ModalPecas({ children, peca = 'Peça', recebePeca }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState([]);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      width: 150,
      render: (_, row, i) => 
      <BuscarValorProduto name={row.name}
        category={retornaCategoria(data)}
        guardaValor={(el) => alteraValor(el, i)}
        permaLink={(el) => adicionaLink(el, i)}/>,
    },
    {
      title: '',
      width: 150,
      render: (_, row) => (
        <Button
          onClick={() => selecionaPeca(row)}
          style={{ backgroundColor: '#52C41A', color: '#FFFFFF' }} 
        >
          Adicionar Peça
        </Button>
      ),
    },
  ];

  const alteraValor = (price, i) => {
    const nData = [...data];

    nData[i].price = price;

    console.log('valor',price);
    
    setData(nData);
  }

  const adicionaLink = (permalink, i) => {
    const nData = [...data];

    nData[i].permalink = permalink;

    console.log('valor',permalink);
    
    setData(nData);
  }

  const alteraMarcador = (checked, i) => {
    const nFiltro = [...filtro];

    nFiltro[i].valor = checked;

    setFiltro(nFiltro);
  }

  const retornaCategoria = () => {    
    //---CODIGO DAS CATEGORIAS---//  
    // "cpu":"MLB1693",
    // "cooler":"MLB2676",
    // "fan":"MLB2676",
    // "case":"MLB1696",
    // "hard_drive":"MLB1672",
    // "headphone":"MLB196208",
    // "keyboard":"MLB418472",
    // "memory":"MLB1694",
    // "monitor":"MLB99245",
    // "motherboard":"MLB1692",
    // "gpu":"MLB1658",
    // "mouse":"MLB1714",
    // "psu":"MLB6777",
    // "thermal_paste":"MLB63102",
    // "webcam":"MLB73364",
    // "stabilizers_and_ups":"MLB1718"

    return peca == 'Processador' ? 'MLB1693' 
      : peca == 'Placa de Vídeo' ? 'MLB1658'
      : peca == 'Placa Mãe' ? 'MLB1692'
      : peca == 'Memória RAM' ? 'MLB1694'
      : peca == 'Armazenamento' ? 'MLB1672'
      : peca == 'Fonte' ? 'MLB6777'
      : peca == 'Gabinete' ? 'MLB1696' : '';
  }

  const setaItensFiltro = () => {
    if (peca === 'Processador') {
      setFiltro([
        { nome: 'Intel', valor: false},
        { nome: 'AMD', valor: false},
      ]);
    } else if (peca === 'Placa de Vídeo'){
      setFiltro([
        { nome: 'ASUS', valor: false},
        { nome: 'NVIDIA', valor: false},
        { nome: 'EVGA', valor: false},
        { nome: 'GALAX', valor: false},
        { nome: 'Gigabyte', valor: false},
      ]);
    }else if (peca === 'Placa Mãe'){
      setFiltro([
        { nome: 'ASUS', valor: false},
        { nome: 'Gigabyte', valor: false},
        { nome: 'MSI', valor: false},
        { nome: 'ASRock', valor: false},
      ]);
    } else if (peca === 'Memória RAM'){
      setFiltro([
        { nome: 'Corsair', valor: false},
        { nome: 'Kingston', valor: false},
        { nome: 'XPG', valor: false},
        { nome: 'Crucial', valor: false},
      ]);
    } else if (peca === 'Armazenamento'){
      setFiltro([
        { nome: 'Samsung', valor: false},
        { nome: 'Kingston', valor: false},
        { nome: 'SanDisk', valor: false},
        { nome: 'Crucial', valor: false},
      ]);
    } else if (peca === 'Fonte'){
      setFiltro([
        { nome: 'Antec', valor: false},
        { nome: 'Corsair', valor: false},
        { nome: 'EVGA', valor: false},
        { nome: 'Aerocool', valor: false},
      ]);
    } else if (peca === 'Gabinete'){
      setFiltro([
        { nome: 'Redragon', valor: false},
        { nome: 'Razer', valor: false},
        { nome: 'Pichau', valor: false},
        { nome: 'NZXT', valor: false},
      ]);
    }
  }

  const fetchPecas = async () => {
    setLoading(true);

    setaItensFiltro();

    const requisicao = peca == 'Processador' ? 'cpu/all' 
      : peca == 'Placa de Vídeo' ? 'gpu/all'
      : peca == 'Placa Mãe' ? 'motherboard/all'
      : peca == 'Memória RAM' ? 'memory/all'
      : peca == 'Armazenamento' ? 'storage/all'
      : peca == 'Fonte' ? 'powersupply/all'
      : peca == 'Gabinete' ? 'case/all' : '';
    
    const params = new URLSearchParams({
      pesquisa,
    });    
    
    try {
      const response = await fetch(`http://localhost:8081/api/${requisicao}`);
      // const response = await fetch(`http://localhost:8081/api/${requisicao}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(result);
      
      setData(result);
    } catch (error) {
      Modal.error({
        title: 'Erro ao buscar peças',
        content: error.message,
        style: { whiteSpace: 'pre-wrap' }
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (visible) fetchPecas();
  }, [visible]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const filtered = data.filter((peca) =>
  //       peca.descricao?.toLowerCase().includes(pesquisa?.toLowerCase())
  //     );
  //     setData(filtered);
  //   }, 100);

  //   return () => {clearTimeout(timeout);};
  // }, [pesquisa, data]);

  const selecionaPeca = (peca) => { 
    setLoading(true);
    console.log('peca', peca);
    
    recebePeca(peca);
    setVisible(false);
  };

  const afterClose = () => {
    setPesquisa('');
    setLoading(false);
  };

  return (
    <span>
      <span onClick={(e) => { e.stopPropagation(); setVisible(true); }}>
        {children}
      </span>
      <Modal
        open={visible}
        title={peca}
        width={800}
        centered
        destroyOnClose
        afterClose={afterClose}
        onCancel={() => setVisible(false)}
        footer={<Button onClick={() => setVisible(false)}>Cancelar</Button>}
      >
        <Row gutter={[10, 10]} justify="space-between">
          <Col span={20}>
            <Row gutter={10}>
              <Col span={24}>
                <Input placeholder={`Pesquisar ${peca}...`}
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}/>
              </Col>
            </Row>
          </Col>
          <Col>
            <Popover title='Filtro'
              trigger="click"
              placement='left'
              content={
                filtro.map((item, i) => (
                  <Row>
                    <Col>
                      <Checkbox checked={item.valor}
                        onChange={({target: {checked}}) => alteraMarcador(checked, i)}>
                        {item.nome}
                      </Checkbox>
                    </Col>
                  </Row>
                ))
              }>
              <Button color='primary'
                variant='solid'>
                <FilterOutlined />
              </Button>
            </Popover>
          </Col>
          <Col span={24}>
            <Table
              size="small"
              columns={columns}
              dataSource={data}
              loading={loading}
              rowKey={(value) => value.id}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Col>
        </Row>
      </Modal>
    </span>
  );
}

ModalPecas.propTypes = {
  children: PropTypes.node,
  peca: PropTypes.string,
  recebePeca: PropTypes.func.isRequired,
};

export default ModalPecas;
