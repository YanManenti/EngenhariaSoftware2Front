import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Table, Button, Input } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function ModalPecas({ children, peca = 'Peça', recebePeca }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      width: 150,
      render: (value) => value.toFixed(2),
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

  const fetchPecas = () => {
    const pecas = [
      { descricao: 'Componente 1 com a descrição técnica do mesmo', valor: 936.0 },
      { descricao: 'Componente 2 com a descrição técnica do mesmo', valor: 1005.5 },
      { descricao: 'Componente 3 com a descrição técnica do mesmo', valor: 783.99 },
      { descricao: 'Componente 4 com a descrição técnica do mesmo', valor: 430.0 },
      { descricao: 'Componente 5 com a descrição técnica do mesmo', valor: 2500.0 },
    ];
    setData(pecas);
    setFilteredData(pecas); 
  };

  useEffect(() => {
    if (visible) fetchPecas();
  }, [visible]);

  useEffect(() => {
    const filtered = data.filter((peca) =>
      peca.descricao.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setFilteredData(filtered);
  }, [pesquisa, data]);

  const selecionaPeca = (peca) => {
    recebePeca(peca);
    setVisible(false);
  };

  const afterClose = () => {
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
            <Input
              placeholder={`Pesquisar ${peca}...`}
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Table
              size="small"
              columns={columns}
              dataSource={filteredData}
              rowKey={(value) => value.descricao}
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
