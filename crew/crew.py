import os
from crewai import Agent, Task, Crew, Process
from crewai_tools import DirectoryReadTool, FileReadTool

# Definir a variável de ambiente OPENAI_API_KEY
os.environ["OPENAI_API_KEY"] = 'sk-proj-n8pjZjeBrYOucxYMgudeT3BlbkFJ2AVeyuFwyHRDekyYzyFQ'

# Definir o caminho para o projeto local
project_path = '/home/Skynet/Documents/Python/my-app/'

# Função para listar todos os arquivos em um diretório recursivamente, ignorando pastas específicas
def list_all_files(directory, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = ['node_modules', 'myenv', 'crew']
    files_list = []
    for root, dirs, files in os.walk(directory):
        # Remover diretórios que devem ser ignorados
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for file in files:
            files_list.append(os.path.join(root, file))
    return files_list

# Listar todos os arquivos no diretório do projeto, ignorando pastas específicas
all_files = list_all_files(project_path)

# Ferramentas necessárias
directory_tool = DirectoryReadTool(directory=project_path)
file_read_tool = FileReadTool()

# Função para escrever arquivos (alternativa ao FileWriteTool)
def write_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

# Função para os agentes modificarem arquivos
def modify_file(file_path, modification_callback):
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r') as file:
                content = file.read()
            modified_content = modification_callback(content)
            write_file(file_path, modified_content)
            print(f"Arquivo {file_path} modificado com sucesso.")
        except Exception as e:
            print(f"Erro ao ler ou escrever o arquivo {file_path}: {e}")
    else:
        print(f"Arquivo {file_path} não encontrado.")

# Criar agente especializado em frontend (React) usando GPT-4o
frontend_agent = Agent(
    role='Especialista em Frontend',
    goal='Analisar e melhorar os componentes de frontend do projeto, com foco em React.',
    verbose=True,
    memory=True,
    backstory=(
        "Você é um especialista em desenvolvimento de frontend com um foco especial em React."
        " Você tem um olho aguçado para design e usabilidade, criando interfaces de usuário"
        " dinâmicas e responsivas."
    ),
    tools=[directory_tool, file_read_tool],
    allow_delegation=True,
    model='gpt-4o'  # Especificando o uso do GPT-4o
)

# Criar agente especializado em backend (Inteligência Artificial, Python e bancos de dados) usando GPT-4o
backend_agent = Agent(
    role='Especialista em Backend',
    goal='Analisar e melhorar os componentes de backend do projeto, com foco em inteligência artificial, Python e bancos de dados.',
    verbose=True,
    memory=True,
    backstory=(
        "Você é um especialista em desenvolvimento de backend com vasta experiência em inteligência artificial."
        " Você domina Python e tem um profundo conhecimento sobre bancos de dados, garantindo que o backend"
        " do projeto seja escalável, eficiente e seguro."
    ),
    tools=[directory_tool, file_read_tool],
    allow_delegation=True,
    model='gpt-4o'  # Especificando o uso do GPT-4o
)

# Criar função para gerar tarefas de entendimento em partes menores
def create_understand_project_tasks(files):
    tasks = []
    chunk_size = 5  # Ajustar conforme necessário para evitar exceder o limite de tokens
    for i in range(0, len(files), chunk_size):
        chunk_files = files[i:i+chunk_size]
        task_description = f"Leia e entenda os seguintes arquivos do projeto: {', '.join(chunk_files)}"
        task = Task(
            description=task_description,
            expected_output='Uma visão geral dos arquivos com sugestões de melhorias.',
            tools=[directory_tool, file_read_tool],
            agent=frontend_agent,
            async_execution=False,
        )
        tasks.append(task)
    return tasks

# Gerar tarefas de entendimento do projeto
understand_project_tasks = create_understand_project_tasks(all_files)

# Formar a equipe
crew = Crew(
    agents=[frontend_agent, backend_agent],
    tasks=understand_project_tasks,
    process=Process.sequential
)

# Iniciar a execução da equipe
result = crew.kickoff(inputs={'project_path': project_path})
print(result)
