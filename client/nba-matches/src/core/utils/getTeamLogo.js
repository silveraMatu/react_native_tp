export const getTeamLogo = (acronym) => {
  if (!acronym) return ''
  return `https://a.espncdn.com/i/teamlogos/nba/500/${acronym.toLowerCase()}.png`
}