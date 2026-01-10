/**
 * 日付を YYYY-MM-DD 形式に整形する共通ユーティリティ
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  // 無効な日付（Invalid Date）の場合は空文字を返す
  if (isNaN(date.getTime())) return "";

  // splitの結果が必ず存在することを保証するために || "" を追加
  const formatted = date.toISOString().split("T")[0];
  return formatted || "";
};
