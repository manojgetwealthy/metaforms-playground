class Utils {
    static getUniqueName(fields, formType, name, sectionName) {
        let uName = name+'_1';
        if (formType === 'simple') {
            const match = fields.find(f => f.name === uName);
            if (!match) {
                return uName;
            } else {
                return this.getUniqueName(fields, formType, uName, sectionName);
            }
        } else {
            const matchSection = fields.find(f => f.name === sectionName);
            if (matchSection) {
                const match = matchSection.fields.find(f => f.name === uName);
                if (!match) {
                    return uName;
                } else {
                    return this.getUniqueName(fields, formType, uName, sectionName);
                }
            }
        }
        return uName;
    }
}

export default Utils