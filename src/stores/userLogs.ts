import { defineStore } from "pinia";
import VotingLogItem from "../models/VotingLogItem";

export const userLogsStore = defineStore("userLogs", {
    state: () => {
        return { 
            votingLog: [] as VotingLogItem[],
            favoritesLog: [] as VotingLogItem[]
        }
    },
    actions: {
        addToVotingLog (payload: VotingLogItem) {
            this.votingLog.push(payload);
        }, 
        addToFavoritesLog (payload: VotingLogItem) {
            this.favoritesLog.push(payload);
        }
    }
});