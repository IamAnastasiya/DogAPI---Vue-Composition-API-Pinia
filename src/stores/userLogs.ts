import { defineStore } from "pinia";
import VotingLogItem from "../models/VotingLogItem";
import { ref } from 'vue';

export const userLogsStore = defineStore("userLogs",  () => {
    const votingLog = ref<VotingLogItem[]>([]);
    const favoritesLog = ref<VotingLogItem[]>([]);

    const addToVotingLog = (payload: VotingLogItem) => {
        votingLog.value.push(payload);
    }

    const addToFavoritesLog = (payload: VotingLogItem) => {
        favoritesLog.value.push(payload);
    }

    return {votingLog, favoritesLog, addToVotingLog, addToFavoritesLog};
});
