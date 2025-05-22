import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NascimentoValidationService {
  static validarDataNascimento(control: AbstractControl): ValidationErrors | null {
    const dataStr = control.value;
    if (!dataStr) return null;

    let dia: number, mes: number, ano: number;

    if (dataStr.includes('/')) { // Formato DD/MM/YYYY
      const partes = dataStr.split('/');
      if (partes.length !== 3) {
        return { invalidDate: true };
      }
      dia = Number(partes[0]);
      mes = Number(partes[1]) - 1; // mes zero-based
      ano = Number(partes[2]);
    } else if (dataStr.length === 8 && /^\d+$/.test(dataStr)) { // Formato DDMMYYYY (apenas números)
      dia = Number(dataStr.substring(0, 2));
      mes = Number(dataStr.substring(2, 4)) - 1; // mes zero-based
      ano = Number(dataStr.substring(4, 8));
    } else {
      // Formato não reconhecido
      return { invalidDate: true };
    }

    // Validação de ano mínimo (ex: para não aceitar ano 0001)
    if (ano < 1900 || ano > new Date().getFullYear() + 10) { // Adicione um limite superior razoável se necessário
        return { invalidDate: true };
    }

    const data = new Date(ano, mes, dia);

    // Confirma se data criada bate com valores originais
    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes ||
      data.getDate() !== dia
    ) {
      return { invalidDate: true };
    }

    const hoje = new Date();
    // Zera a hora para comparar apenas datas
    hoje.setHours(0, 0, 0, 0);
    // Não precisa zerar a hora de 'data' pois ela já é criada sem hora específica.

    let idade = hoje.getFullYear() - data.getFullYear();
    const mesAniversario = hoje.getMonth() - data.getMonth();

    if (mesAniversario < 0 || (mesAniversario === 0 && hoje.getDate() < data.getDate())) {
      idade--;
    }

    if (idade < 18) {
      return { underAge: true };
    }

    return null;
  }
}
