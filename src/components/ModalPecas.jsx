import React, {useEffect, useState} from 'react';
import {Row, Col, Modal, Table, Button} from 'antd';

import '../pages/ModalPecas.css';
import './hidePerPage.css'

function ModalPecas({children, peca = 'Peça', nome, recebePeca}) {
  const [pageData, setPageData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageTotal, setPageTotal] = useState(0);

  const handleChange = (pagination, filters, sorter) => {
    const offset = pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;
    if (offset === undefined || limit === undefined) return;
    fetchValor(limit, offset)
  }

  const fetchValor = async (limit, offset) => {
    if (nome === undefined) return;
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(nome)}&category=${retornaCategoria()}&offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar valor: ${response.statusText}`);
      }
      const result = await response.json();
      setPageTotal(result.paging.total);
      setPageData(result.results)
    } catch (error) {
      console.error('Erro ao buscar valor do produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Imagem',
      dataIndex: 'thumbnail',
      key: 'imagem',
      width: 100,
      render: (_) => <img src={_} alt="thumbnail" style={{ maxHeight: '90px', maxWidth: '90px' }} />
    },
    {
      title: 'Descrição',
      dataIndex: 'title',
      key: 'name',
      render: (_) => <span style={{color: '#e8e5e7', fontWeight: 'bold'}}>{_}</span>
    },
    {
      title: 'Valor',
      dataIndex: 'price',
      key: 'valor',
      width: 150,
      render: (_) => <span>R$ {_.toFixed(2) || 'N/A'}</span>
    },
    {
      title: '',
      width: 150,
      render: (_, row) => (
          <Button
              onClick={() => selecionaPeca(_)}
              className="custom-button"
          >
            Adicionar Peça
          </Button>
      ),
    },
  ];


  const retornaCategoria = () => {
    return peca === 'Processador' ? 'MLB1693'
        : peca === 'Placa de Vídeo' ? 'MLB1658'
            : peca === 'Placa Mãe' ? 'MLB1692'
                : peca === 'Memória RAM' ? 'MLB1694'
                    : peca === 'Armazenamento' ? 'MLB1672'
                        : peca === 'Fonte' ? 'MLB6777'
                            : peca === 'Gabinete' ? 'MLB1696'
                                : peca === 'Pasta Térmica' ? 'MLB63102'
                                    : peca === 'Ventoinha' ? 'MLB2676'
                                        : peca === 'Cooler para Processador' ? 'MLB2676' : ''
  }

  useEffect(() => {
    if (visible) fetchValor(6, 0);
  }, [visible]);

  const selecionaPeca = (peca) => {
    setLoading(true);
    recebePeca(peca);
    setVisible(false);
  };

  const afterClose = () => {
    setLoading(false);
  };

  return (
      <span>
      <span onClick={(e) => {
        e.stopPropagation();
        setVisible(true);
      }}>
        {children}
      </span>
      <Modal
          open={visible}
          className="modal-pecas"
          title={nome}
          width={800}
          centered
          destroyOnClose
          afterClose={afterClose}
          onCancel={() => setVisible(false)}
          footer={<Button onClick={() => setVisible(false)} className="custom-button">Cancelar</Button>}
      >
        <Row gutter={[10, 10]} justify="space-between">
          <Col span={24}>
            <Table
                size="small"
                columns={columns}
                dataSource={pageData}
                loading={loading}
                onChange={handleChange}
                rowKey={(value) => value.id}
                pagination={{pageSize: 6, total: pageTotal}}
                bordered
                className="custom-table"
            />
          </Col>
        </Row>
      </Modal>
    </span>
  );
}

export default ModalPecas;
