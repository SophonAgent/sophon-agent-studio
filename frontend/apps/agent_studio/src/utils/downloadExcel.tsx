import * as XLSX from 'xlsx';

export function exportToExcel(data: any, columns: any, fileName: string) {
  // 创建工作簿
  const headers = columns.map((col: any) => col?.title?.props?.children?.[0] || col?.title);
  headers.unshift('ID');
  const wb = XLSX.utils.book_new();

  // 将数据转换为二维数组（不包含表头）
  const dataWithoutHeaders = data.map((obj: any) => {
    return Object.values(obj)?.map((i: any) => {
      if (typeof i !== 'string') {
        return i?.props?.children?.[0] || i;
      }
      return i;
    });
  });

  // 插入表头
  dataWithoutHeaders.unshift(headers);
  // 将数据数组转换为工作表
  const ws = XLSX.utils.aoa_to_sheet(dataWithoutHeaders);

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // 生成Excel文件并下载
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
