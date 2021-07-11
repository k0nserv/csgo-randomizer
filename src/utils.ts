export function calculateDiff(
	team_one: Array<number>,
	team_two: Array<number>,
	teamSize: number
): number {
	const team_one_avg_elo = team_one.map((p) => p).reduce((a, b) => a + b, 0) / teamSize;
	const team_two_avg_elo = team_two.map((p) => p).reduce((a, b) => a + b, 0) / teamSize;

	return (
		Math.max(team_one_avg_elo, team_two_avg_elo) / Math.min(team_one_avg_elo, team_two_avg_elo)
	);
}
