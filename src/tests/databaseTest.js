import { getConnection, closeConnection } from '../config/database.js';

const testDatabaseConnection = async () => {
  try {
    console.log('\n🔄 Iniciando teste de conexão com o banco de dados...');
    console.log('📝 Configurações de conexão:');
    console.log('   Host:', process.env.DB_HOST);
    console.log('   Database:', process.env.DB_NAME);
    console.log('   User:', process.env.DB_USER);
    
    // Testa a conexão
    console.log('\n🔌 Tentando estabelecer conexão...');
    const connection = await getConnection();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Verifica se as tabelas foram criadas
    console.log('\n📊 Verificando estrutura das tabelas...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('   Tabelas encontradas:', tables.map(t => Object.values(t)[0]).join(', '));

    // Testa inserção
    console.log('\n📥 Testando operação de INSERT...');
    const [insertResult] = await connection.execute(
      'INSERT INTO visitors (ip, first_visit, last_visit) VALUES (?, NOW(), NOW())',
      ['127.0.0.1']
    );
    console.log('✅ Inserção realizada com sucesso!');
    console.log('   ID inserido:', insertResult.insertId);

    // Testa leitura
    console.log('\n📖 Testando operação de SELECT...');
    const [rows] = await connection.execute('SELECT * FROM visitors WHERE ip = ?', ['127.0.0.1']);
    console.log('✅ Leitura realizada com sucesso!');
    console.log('   Dados encontrados:', JSON.stringify(rows[0], null, 2));

    // Testa atualização
    console.log('\n📝 Testando operação de UPDATE...');
    const [updateResult] = await connection.execute(
      'UPDATE visitors SET total_visits = total_visits + 1 WHERE ip = ?',
      ['127.0.0.1']
    );
    console.log('✅ Atualização realizada com sucesso!');
    console.log('   Linhas afetadas:', updateResult.affectedRows);

    // Testa exclusão
    console.log('\n🗑️ Testando operação de DELETE...');
    const [deleteResult] = await connection.execute(
      'DELETE FROM visitors WHERE ip = ?',
      ['127.0.0.1']
    );
    console.log('✅ Exclusão realizada com sucesso!');
    console.log('   Linhas removidas:', deleteResult.affectedRows);

    // Fecha a conexão
    await closeConnection();
    console.log('✅ Conexão fechada com sucesso!');
    console.log('\n🎉 Todos os testes foram concluídos com sucesso!');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:');
    console.error('   Mensagem:', error.message);
    console.error('   Código:', error.code);
    console.error('   Stack:', error.stack);
    await closeConnection();
  }
};

testDatabaseConnection();