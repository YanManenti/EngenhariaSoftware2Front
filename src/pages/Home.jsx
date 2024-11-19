import React, { useState } from 'react';
import { Layout, Button, List, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ModalPecas from './ModalPecas';

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const [total, setTotal] = useState(0.00);
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
    console.log('index', i);
    console.log('retorno', retorno);
    const nComponentes = [...componentes];

    nComponentes[i].peca = retorno;

    setTotal(total + retorno.valor);

    setComponentes(nComponentes);
  };

  const removerPeca = (i) => {
    const nComponentes = [...componentes];

    setTotal(total - nComponentes[i].peca.valor)
    nComponentes[i].peca = {};

    setComponentes(nComponentes);
  }

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: 'transparent', textAlign: 'center', padding: '10px' }}>
        <Title style={{ color: '#2d3277', margin: '20px', fontSize: 'px', fontWeight: 'bold' }}>Monte seu PC!</Title>
      </Header>
      <Content style={{ padding: '20px', maxWidth: '100%', margin: '20px' }}>
        <Row justify="center"
          style={{ marginBottom: '20px' }}>
          <Col>
            <div className="price-box">
              <Title level={2}
                style={{ textAlign: 'center', color: '#52C41A', padding: '10px', backgroundColor: '#002766', marginBottom: '10px', borderRadius: '10px' }}>
                R$ {total.toFixed(2)}
              </Title>
            </div>
          </Col>
        </Row>
        <List dataSource={componentes}
          renderItem={(item, index) => (
            <List.Item style={{ padding: '10px', backgroundColor: '#f7d02c', marginBottom: '10px', borderRadius: '10px', border: '1px solid black' }}>
              <Row justify="start"
                align="middle"
                style={{ width: '100%' }}>
                <Col span={3}>
                  <Title level={4}
                    style={{ margin: 0 }}>
                    {item.nome}
                  </Title>
                </Col>
                {!item?.peca?.descricao ?
                  <Col span={2}>
                    <ModalPecas peca={item.nome}
                      recebePeca={(valor) => adicionarPeca(index, valor)}>
                      <Button
                        shape="circle"
                        icon={<PlusOutlined style={{ fontSize: '16px' }} />}
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#2d3277',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.2)';
                          e.currentTarget.style.backgroundColor = '#52c41a';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          e.currentTarget.style.color = '#2d3277';
                        }}
                      />
                    </ModalPecas>
                  </Col>
                  : ''}
                {item?.peca?.descricao ?
                  <React.Fragment>
                    <Col span={16}>
                      <label style={{ fontSize: 16 }}>{item?.peca.descricao}</label>
                    </Col>
                    <Col span={3}>
                      <label style={{ color: '#52C41A', fontSize: 24, fontWeight:'bold'}}>R$ {item?.peca?.valor.toFixed(2)}</label>
                    </Col>
                    <Col span={2}>
                      <Button
                        shape="circle"
                        icon={<MinusOutlined style={{ fontSize: '16px' }} />}
                        style={{
                          backgroundColor: '#FFFFFF',
                          color: '#000000',
                          transition: 'all 0.3s ease',
                          transform: 'scale(1)',
                        }}
                        onClick={() => { removerPeca(index); }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5222D';
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.color = '#000000';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </Col>
                  </React.Fragment>
                  : ''}
              </Row>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Home;