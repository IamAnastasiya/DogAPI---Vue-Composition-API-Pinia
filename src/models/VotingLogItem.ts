type VotingLogItem = {
    id: string;
    action: 'add' | 'remove';
    category: string;
    time: string
}

export default VotingLogItem;