import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="card max-w-4xl mx-auto">
          <div className="card-header">
            <h1 className="text-2xl font-bold text-gray-800 font-cinzel">Sobre o Sistema</h1>
          </div>
          <div className="card-body">
            <div className="prose max-w-none">
              <section className="mb-8">
                <p className="text-lg text-gray-700 mb-4">
                  O sistema "Não se vá com IA" foi desenvolvido para ajudar instituições de ensino a identificar
                  estudantes com risco de evasão, permitindo intervenções preventivas e personalizadas. Utilizando
                  inteligência artificial e análise de dados, nosso sistema oferece uma solução eficaz para um dos
                  maiores desafios enfrentados pelas instituições educacionais.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4 font-cinzel">O Projeto</h2>
                <p className="text-gray-700 mb-4">
                  Este projeto foi desenvolvido como parte do Hackathon Unifenas 2025, com o objetivo de criar uma
                  solução tecnológica para reduzir as taxas de evasão escolar. Nossa equipe multidisciplinar combinou
                  conhecimentos em desenvolvimento de software, ciência de dados e pedagogia para criar uma ferramenta
                  que não apenas identifica alunos em risco, mas também sugere intervenções personalizadas.
                </p>

                <p className="text-gray-700 mb-4">
                  A solução foi construída utilizando tecnologias modernas como Next.js, React e TailwindCSS para o
                  frontend, garantindo uma interface intuitiva e responsiva. Para o backend, implementamos uma
                  integração com a API da Unifenas, que fornece dados em tempo real sobre a atividade dos alunos no
                  ambiente virtual de aprendizagem.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4 font-cinzel">
                  Como Funciona a Medição de Evasão
                </h2>
                <p className="text-gray-700 mb-4">
                  Nosso sistema utiliza um algoritmo de inteligência artificial para analisar diversos fatores
                  relacionados ao desempenho e engajamento dos alunos analisar diversos fatores relacionados ao
                  desempenho e engajamento dos alunos. O modelo de predição atribui pesos diferentes a cada fator,
                  calculando um score de engajamento que determina o nível de risco de evasão.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3 font-cinzel">Fatores Analisados</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="mb-2">Frequência e presença nas aulas (25%)</li>
                    <li className="mb-2">Desempenho acadêmico/notas (20%)</li>
                    <li className="mb-2">Engajamento na plataforma/acessos (20%)</li>
                    <li className="mb-2">Participação em fóruns e discussões (15%)</li>
                    <li className="mb-2">Conclusão de atividades e tarefas (20%)</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-800 mb-3 font-cinzel">Cálculo do Risco</h3>
                  <p className="text-gray-700 mb-2">
                    O algoritmo normaliza cada fator em uma escala de 0 a 1 e aplica os pesos correspondentes. O score
                    final determina o nível de risco:
                  </p>
                  <ul className="list-none pl-6 mb-0 text-gray-700">
                    <li className="mb-1 flex items-center">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
                      <strong>Risco Baixo:</strong> Score ≥ 0.7
                    </li>
                    <li className="mb-1 flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                      <strong>Risco Médio:</strong> Score entre 0.4 e 0.7
                    </li>
                    <li className="mb-1 flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      <strong>Risco Alto:</strong> Score &lt; 0.4
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 mb-4">
                  O sistema atualiza continuamente o risco de evasão à medida que novos dados são coletados, permitindo
                  que as instituições monitorem a evolução do engajamento dos alunos ao longo do tempo e ajustem suas
                  estratégias de intervenção conforme necessário.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4 font-cinzel">
                  Integração com Dados Reais
                </h2>
                <p className="text-gray-700 mb-4">
                  O sistema se integra com a API da instituição para obter dados atualizados sobre os alunos. Através
                  desta integração, coletamos informações como:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li className="mb-2">Registros de acesso à plataforma de ensino</li>
                  <li className="mb-2">Participação em atividades online</li>
                  <li className="mb-2">Interações em fóruns e discussões</li>
                  <li className="mb-2">Notas e avaliações</li>
                  <li className="mb-2">Frequência nas aulas presenciais e online</li>
                </ul>
                <p className="text-gray-700">
                  Estes dados são processados pelo nosso algoritmo, que calcula o risco de evasão em tempo real,
                  permitindo uma visão atualizada do engajamento dos alunos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4 font-cinzel">Benefícios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2 font-cinzel">Para a Instituição</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li className="mb-1">Redução das taxas de evasão</li>
                      <li className="mb-1">Otimização de recursos institucionais</li>
                      <li className="mb-1">Melhoria nos índices de conclusão de curso</li>
                      <li className="mb-1">Dados para aprimoramento pedagógico</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-2 font-cinzel">Para os Alunos</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li className="mb-1">Suporte personalizado</li>
                      <li className="mb-1">Intervenções oportunas</li>
                      <li className="mb-1">Maior chance de conclusão do curso</li>
                      <li className="mb-1">Melhor experiência educacional</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4 font-cinzel">Próximos Passos</h2>
                <p className="text-gray-700 mb-4">
                  Estamos constantemente trabalhando para melhorar nosso sistema. Alguns dos desenvolvimentos futuros
                  incluem:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li className="mb-2">Aprimoramento do algoritmo de IA com mais variáveis</li>
                  <li className="mb-2">Implementação de um sistema de notificações automáticas</li>
                  <li className="mb-2">Desenvolvimento de um módulo de recomendações personalizadas</li>
                  <li className="mb-2">Integração com sistemas de gestão acadêmica</li>
                  <li className="mb-2">Análise preditiva para identificar tendências de evasão</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
