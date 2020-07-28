export default(state=[],payload)=>{
    switch(payload){
        case 'search':
            return [...state,payload.item];
        default:
            return state;
    }
}