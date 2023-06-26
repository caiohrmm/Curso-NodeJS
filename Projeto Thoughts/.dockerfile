FROM mysql

# Copia um arquivo SQL para dentro do contêiner
COPY create_database.sql /docker-entrypoint-initdb.d/

# Define as variáveis de ambiente para a criação do banco de dados
ENV MYSQL_DATABASE=thoughts
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=joj123
ENV MYSQL_ROOT_PASSWORD=joj123

# Expose a porta padrão do MySQL
EXPOSE 3306