const SetUtil = {
    areSetsEqaul : function(set1,set2){
        if(set1.size === 0 && set2.size === 0) return false;
        const array1 = Array.from(set1)
        const array2 = Array.from(set2)
        array1.sort();
        array2.sort();
        return JSON.stringify(array1) === JSON.stringify(array2);

    },
    areSetsEqaul_v2 : function(set1,set2){
        if(set1.size === 0 && set2.size === 0) return false;
        if(set1.size !== set2.size) return false;

        for(const item of set1){
            if(!set2.has(item )){
                return false;
            }
        }

        return true;
    }
}



module.exports = SetUtil

