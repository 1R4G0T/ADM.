import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

// Classe para gerenciar a Ficha Técnica do Sushi
class ComboSushi {
    private double precoArrozPct = 0; // Pacote de 5kg
    private double gramasArrozUsadas = 0;
    private double precoPeixeKg = 0;  // 1kg
    private double gramasPeixeUsadas = 0;
    private double precoAlgaPct = 0;  // Pacote com 50 folhas
    private double folhasAlgaUsadas = 0;
    private double precoVenda = 0;

    // Construtor
    public ComboSushi(double precoArrozPct, double gramasArrozUsadas, 
                      double precoPeixeKg, double gramasPeixeUsadas, 
                      double precoAlgaPct, double folhasAlgaUsadas, double precoVenda) {
        this.precoArrozPct = precoArrozPct;
        this.gramasArrozUsadas = gramasArrozUsadas;
        this.precoPeixeKg = precoPeixeKg;
        this.gramasPeixeUsadas = gramasPeixeUsadas;
        this.precoAlgaPct = precoAlgaPct;
        this.folhasAlgaUsadas = folhasAlgaUsadas;
        this.precoVenda = precoVenda;
    }

    // Calcula o custo total dos insumos para uma unidade/combo
    public double calcularCustoTotal() {
        double custoArroz = (this.precoArrozPct / 5000) * this.gramasArrozUsadas;
        double custoPeixe = (this.precoPeixeKg / 1000) * this.gramasPeixeUsadas;
        double custoAlga = (this.precoAlgaPct / 50) * this.folhasAlgaUsadas;
        return custoArroz + custoPeixe + custoAlga;
    }

    public double getPrecoVenda() {
        return this.precoVenda;
    }

    public double calcularLucroUnitario() {
        return this.precoVenda - calcularCustoTotal();
    }

    public double calcularMargemPorcentagem() {
        if (this.precoVenda == 0) return 0;
        return (calcularLucroUnitario() / this.precoVenda) * 100;
    }
}

// Classe Principal com o Fluxo do Sistema
public class KetsuenControl {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== KETSUEN CONTROL (MÓDULO JAVA) ===");
        System.out.println("--- 1. CONFIGURAÇÃO DA FICHA TÉCNICA ---");
        
        System.out.print("Preço do pacote de Arroz 5kg (R$): ");
        double pArroz = scanner.nextDouble();
        System.out.print("Gramas de arroz por combo: ");
        double gArroz = scanner.nextDouble();

        System.out.print("Preço do kg do Peixe (R$): ");
        double pPeixe = scanner.nextDouble();
        System.out.print("Gramas de peixe por combo: ");
        double gPeixe = scanner.nextDouble();

        System.out.print("Preço do pct de Alga c/ 50fl (R$): ");
        double pAlga = scanner.nextDouble();
        System.out.print("Quantidade de folhas/frações usadas: ");
        double qAlga = scanner.nextDouble();

        System.out.print("Preço de VENDA do combo (R$): ");
        double pVenda = scanner.nextDouble();

        // Inicializa o objeto do Sushi com as regras de negócio
        ComboSushi meuSushi = new ComboSushi(pArroz, gArroz, pPeixe, gPeixe, pAlga, qAlga, pVenda);

        System.out.println("\n--- 2. ENTRADA DE VENDAS DA SEMANA ---");
        // LinkedHashMap mantém a ordem dos dias da semana
        Map<String, Integer> vendasSemanais = new LinkedHashMap<>();
        String[] dias = {"Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"};

        for (String dia : dias) {
            System.out.print("Quantidade de combos vendidos na " + dia + ": ");
            int qtd = scanner.nextInt();
            vendasSemanais.put(dia, qtd);
        }

        // --- 3. ENGENHARIA DE RESULTADOS (RELATÓRIO NO CONSOLE) ---
        double custoUnitario = meuSushi.calcularCustoTotal();
        double lucroUnitario = meuSushi.calcularLucroUnitario();
        double margemPct = meuSushi.calcularMargemPorcentagem();

        System.out.println("\n=============================================");
        System.out.println("       ANÁLISE ECONÔMICA DO CARDÁPIO        ");
        System.out.println("=============================================");
        System.out.printf("Custo de Produção por Combo: R$ %.2f\n", custoUnitario);
        System.out.printf("Lucro Líquido por Combo:     R$ %.2f\n", lucroUnitario);
        System.out.printf("Margem de Rentabilidade:      %.1f%%\n", margemPct);
        System.out.println("---------------------------------------------");

        System.out.println("         DESEMPENHO FLUXO DE CAIXA           ");
        System.out.println("---------------------------------------------");
        
        double faturamentoTotalSemana = 0;
        double lucroTotalSemana = 0;

        // Loop para processar dia por dia e simular o "gráfico" via texto
        for (Map.Entry<String, Integer> registro : vendasSemanais.entrySet()) {
            String dia = registro.getKey();
            int qtdVendida = registro.getValue();

            double faturamentoDiario = qtdVendida * meuSushi.getPrecoVenda();
            double lucroDiario = qtdVendida * lucroUnitario;

            faturamentoTotalSemana += faturamentoDiario;
            lucroTotalSemana += lucroDiario;

            // Gera uma barra visual proporcional às vendas para simular o gráfico no terminal
            String barraGrafico = "";
            for (int i = 0; i < Math.min(qtdVendida, 20); i++) {
                barraGrafico += "█"; // Cada bloco representa uma venda (limitado a 20 para não quebrar a tela)
            }
            if (qtdVendida > 20) barraGrafico += "+";

            System.out.printf("%-7s | Vendas: %3d | Fat: R$ %7.2f | Lucro: R$ %7.2f | %s\n", 
                    dia.substring(0, 3), qtdVendida, faturamentoDiario, lucroDiario, barraGrafico);
        }

        System.out.println("=============================================");
        System.out.printf("FATURAMENTO BRUTO SEMANAL: R$ %.2f\n", faturamentoTotalSemana);
        System.out.printf("LUCRO REAL ACUMULADO:      R$ %.2f\n", lucroTotalSemana);
        System.out.println("=============================================");
        
        scanner.close();
    }
}
