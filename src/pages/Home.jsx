import React, { useState } from 'react';
import { Layout, Button, List, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ModalPecas from './ModalPecas';
import logo from '../images/logo_monta_ai.png';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  const [total, setTotal] = useState(0.0);
  const [componentes, setComponentes] = useState([
    { nome: 'Processador', peca: {} },
    { nome: 'Placa de Vídeo', peca: {} },
    { nome: 'Placa Mãe', peca: {} },
    { nome: 'Memória RAM', peca: {} },
    { nome: 'Armazenamento', peca: {} },
    { nome: 'Fonte', peca: {} },
    { nome: 'Gabinete', peca: {} },
  ]);

  const adicionarPeca = (i, retorno) => {
    console.log('retorno',retorno);
    
    const nComponentes = [...componentes];
    nComponentes[i].peca = retorno;
    setTotal(total + retorno.price);
    setComponentes(nComponentes);
  };

  const removerPeca = (i) => {
    const nComponentes = [...componentes];
    setTotal(total - nComponentes[i].peca.price);
    nComponentes[i].peca = {};
    setComponentes(nComponentes);
  };

  return (
    <Layout style={{ backgroundColor: '#282838', minHeight: '100vh' }}>
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
        <div style={{ color: '#e8e5e7', fontSize: '14px' }}>
          <Text style={{ marginRight: '10px' }}>Monte o seu PC sob medida!</Text>
        </div>
      </Header>

      {/* Content */}
      <Content style={{ padding: '20px' }}>
        <List
          header={
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
          }
          footer={
            <div
              style={{
                marginTop: '20px',
                textAlign: 'right',
                color: '#e8e5e7',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Total: R$ {total.toFixed(2)}
            </div>
          }
          dataSource={componentes}
          renderItem={(item, index) => (
            <List.Item
              style={{
                backgroundColor: '#282838',
                borderBottom: '1px solid #333347',
                padding: '15px',
              }}
            >
              <Row style={{ width: '100%' }} align="middle">
                <Col span={6}>
                  <Title
                    level={5}
                    style={{
                      color: '#e8e5e7',
                      margin: 0,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (!item?.peca?.name) {
                        ModalPecas({ peca: item.nome, recebePeca: (valor) => adicionarPeca(index, valor) });
                      }
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#2b86de'}
                    onMouseLeave={(e) => e.target.style.color = '#e8e5e7'}
                  >
                    {item.nome}
                  </Title>
                </Col>
                {!item?.peca?.name ? (
                  <Col span={18} style={{ textAlign: 'right' }}>
                    <ModalPecas
                      peca={item.nome}
                      recebePeca={(valor) => adicionarPeca(index, valor)}
                    >
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{
                          backgroundColor: '#2b86de',
                          borderColor: '#2b86de',
                          color: '#e8e5e7',
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#1a6fa2')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#2b86de')}
                      >
                        Escolher {item.nome}
                      </Button>
                    </ModalPecas>
                  </Col>
                ) : (
                  <>
                    <Col span={12}>
                      <span style={{ color: '#e8e5e7' }}>
                        {item.peca.name}
                      </span>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                      <span style={{ color: '#2b86de', fontWeight: 'bold' }}>
                        R$ {item.peca.price?.toFixed(2)}
                      </span>
                    </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
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
                        onClick={() => removerPeca(index)}
                      />
                    </Col>
                  </>
                )}
              </Row>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Home;
