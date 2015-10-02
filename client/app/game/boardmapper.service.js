(function() {
    'use strict';

    angular
        .module('kongtrac.game')
        .service('boardMapper', boardMapper);

    /* @ngInject */
    function boardMapper() {

        this.getAllLevels = getAllLevels;
        this.mapBoardNumberToLevel = mapBoardNumberToLevel;
        this.mapLevelToBoardNumber = mapLevelToBoardNumber;

        ////////////////

        function getAllLevels() {

            var levelsArray = [
                '1-1', '1-2',
                '2-1', '2-2', '2-3',
                '3-1', '3-2', '3-3', '3-4',
                '4-1', '4-2', '4-3', '4-4', '4-5',
                '5-1', '5-2', '5-3', '5-4', '5-5', '5-6',
                '6-1', '6-2', '6-3', '6-4', '6-5', '6-6',
                '7-1', '7-2', '7-3', '7-4', '7-5', '7-6',
                '8-1', '8-2', '8-3', '8-4', '8-5', '8-6',
                '9-1', '9-2', '9-3', '9-4', '9-5', '9-6',
                '10-1', '10-2', '10-3', '10-4', '10-5', '10-6',
                '11-1', '11-2', '11-3', '11-4', '11-5', '11-6',
                '12-1', '12-2', '12-3', '12-4', '12-5', '12-6',
                '13-1', '13-2', '13-3', '13-4', '13-5', '13-6',
                '14-1', '14-2', '14-3', '14-4', '14-5', '14-6',
                '15-1', '15-2', '15-3', '15-4', '15-5', '15-6',
                '16-1', '16-2', '16-3', '16-4', '16-5', '16-6',
                '17-1', '17-2', '17-3', '17-4', '17-5', '17-6',
                '18-1', '18-2', '18-3', '18-4', '18-5', '18-6',
                '19-1', '19-2', '19-3', '19-4', '19-5', '19-6',
                '20-1', '20-2', '20-3', '20-4', '20-5', '20-6',
                '21-1', '21-2', '21-3', '21-4', '21-5', '21-6',
                '22-1'
            ];

            return levelsArray;

        }

        function mapBoardNumberToLevel(inputBoardNumber) {

        	// For easier typing and better readability.
        	var b = inputBoardNumber;

        	switch (b) {
        		case 0:
        			return '1-1';
        			break;
        		case 1:
        			return '1-2';
        			break;
        		case 2:
        			return '2-1';
        			break;
        		case 3:
        			return '2-2';
        			break;
        		case 4:
        			return '2-3';
        			break;
        		case 5:
        			return '3-1';
        			break;
        		case 6:
        			return '3-2';
        			break;
        		case 7:
        			return '3-3';
        			break;
        		case 8:
        			return '3-4';
        			break;
        		case 9:
        			return '4-1';
        			break;
        		case 10:
        			return '4-2';
        			break;
        		case 11:
        			return '4-3';
        			break;
        		case 12:
        			return '4-4';
        			break;
        		case 13:
        			return '4-5';
        			break;
        		case 14:
        			return '5-1';
        			break;
        		case 15:
        			return '5-2';
        			break;
        		case 16:
        			return '5-3';
        			break;
        		case 17:
        			return '5-4';
        			break;
        		case 18:
        			return '5-5';
        			break;
        		case 19:
        			return '5-6';
        			break;
        		case 20:
        			return '6-1';
        			break;
        		case 21:
        			return '6-2';
        			break;
        		case 22:
        			return '6-3';
        			break;
        		case 23:
        			return '6-4';
        			break;
        		case 24:
        			return '6-5';
        			break;
        		case 25:
        			return '6-6';
        			break;
        		case 26:
        			return '7-1';
        			break;
        		case 27:
        			return '7-2';
        			break;
        		case 28:
        			return '7-3';
        			break;
        		case 29:
        			return '7-4';
        			break;
        		case 30:
        			return '7-5';
        			break;
        		case 31:
        			return '7-6';
        			break;
        		case 32:
        			return '8-1';
        			break;
        		case 33:
        			return '8-2';
        			break;
        		case 34:
        			return '8-3';
        			break;
        		case 35:
        			return '8-4';
        			break;
        		case 36:
        			return '8-5';
        			break;
        		case 37:
        			return '8-6';
        			break;
        		case 38:
        			return '9-1';
        			break;
        		case 39:
        			return '9-2';
        			break;
        		case 40:
        			return '9-3';
        			break;
        		case 41:
        			return '9-4';
        			break;
        		case 42:
        			return '9-5';
        			break;
        		case 43:
        			return '9-6';
        			break;
        		case 44:
        			return '10-1';
        			break;
        		case 45:
        			return '10-2';
        			break;
        		case 46:
        			return '10-3';
        			break;
        		case 47:
        			return '10-4';
        			break;
        		case 48:
        			return '10-5';
        			break;
        		case 49:
        			return '10-6';
        			break;
        		case 50:
        			return '11-1';
        			break;
        		case 51:
        			return '11-2';
        			break;
        		case 52:
        			return '11-3';
        			break;
        		case 53:
        			return '11-4';
        			break;
        		case 54:
        			return '11-5';
        			break;
        		case 55:
        			return '11-6';
        			break;
        		case 56:
        			return '12-1';
        			break;
        		case 57:
        			return '12-2';
        			break;
        		case 58:
        			return '12-3';
        			break;
        		case 59:
        			return '12-4';
        			break;
        		case 60:
        			return '12-5';
        			break;
        		case 61:
        			return '12-6';
        			break;
        		case 62:
        			return '13-1';
        			break;
        		case 63:
        			return '13-2';
        			break;
        		case 64:
        			return '13-3';
        			break;
        		case 65:
        			return '13-4';
        			break;
        		case 66:
        			return '13-5';
        			break;
        		case 67:
        			return '13-6';
        			break;
        		case 68:
        			return '14-1';
        			break;
        		case 69:
        			return '14-2';
        			break;
        		case 70:
        			return '14-3';
        			break;
        		case 71:
        			return '14-4';
        			break;
        		case 72:
        			return '14-5';
        			break;
        		case 73:
        			return '14-6';
        			break;
        		case 74:
        			return '15-1';
        			break;
        		case 75:
        			return '15-2';
        			break;
        		case 76:
        			return '15-3';
        			break;
        		case 77:
        			return '15-4';
        			break;
        		case 78:
        			return '15-5';
        			break;
        		case 79:
        			return '15-6';
        			break;
        		case 80:
        			return '16-1';
        			break;
        		case 81:
        			return '16-2';
        			break;
        		case 82:
        			return '16-3';
        			break;
        		case 83:
        			return '16-4';
        			break;
        		case 84:
        			return '16-5';
        			break;
        		case 85:
        			return '16-6';
        			break;
        		case 86:
        			return '17-1';
        			break;
        		case 87:
        			return '17-2';
        			break;
        		case 88:
        			return '17-3';
        			break;
        		case 89:
        			return '17-4';
        			break;
        		case 90:
        			return '17-5';
        			break;
        		case 91:
        			return '17-6';
        			break;
        		case 92:
        			return '18-1';
        			break;
        		case 93:
        			return '18-2';
        			break;
        		case 94:
        			return '18-3';
        			break;
        		case 95:
        			return '18-4';
        			break;
        		case 96:
        			return '18-5';
        			break;
        		case 97:
        			return '18-6';
        			break;
        		case 98:
        			return '19-1';
        			break;
        		case 99:
        			return '19-2';
        			break;
        		case 100:
        			return '19-3';
        			break;
        		case 101:
        			return '19-4';
        			break;
        		case 102:
        			return '19-5';
        			break;
        		case 103:
        			return '19-6';
        			break;
        		case 104:
        			return '20-1';
        			break;
        		case 105:
        			return '20-2';
        			break;
        		case 106:
        			return '20-3';
        			break;
        		case 107:
        			return '20-4';
        			break;
        		case 108:
        			return '20-5';
        			break;
        		case 109:
        			return '20-6';
        			break;
        		case 110:
        			return '21-1';
        			break;
        		case 111:
        			return '21-2';
        			break;
        		case 112:
        			return '21-3';
        			break;
        		case 113:
        			return '21-4';
        			break;
        		case 114:
        			return '21-5';
        			break;
        		case 115:
        			return '21-6';
        			break;
        		case 116:
        			return '22-1';
        			break;
        	}

        }

        function mapLevelToBoardNumber(inputLevel) {

            // For easier typing and better readability.
            var v = inputLevel;

            switch (v) {
                case '1-1':
                    return 0;
                    break;
                case '1-2':
                    return 1;
                    break;
                case '2-1':
                    return 2;
                    break;
                case '2-2':
                    return 3;
                    break;
                case '2-3':
                    return 4;
                    break;
                case '3-1':
                    return 5;
                    break;
                case '3-2':
                    return 6;
                    break;
                case '3-3':
                    return 7;
                    break;
                case '3-4':
                    return 8;
                    break;
                case '4-1':
                    return 9;
                    break;
                case '4-2':
                    return 10;
                    break;
                case '4-3':
                    return 11;
                    break;
                case '4-4':
                    return 12;
                    break;
                case '4-5':
                    return 13;
                    break;
                case '5-1':
                    return 14;
                    break;
                case '5-2':
                    return 15;
                    break;
                case '5-3':
                    return 16;
                    break;
                case '5-4':
                    return 17;
                    break;
                case '5-5':
                    return 18;
                    break;
                case '5-6':
                    return 19;
                    break;
                case '6-1':
                    return 20;
                    break;
                case '6-2':
                    return 21;
                    break;
                case '6-3':
                    return 22;
                    break;
                case '6-4':
                    return 23;
                    break;
                case '6-5':
                    return 24;
                    break;
                case '6-6':
                    return 25;
                    break;
                case '7-1':
                    return 26;
                    break;
                case '7-2':
                    return 27;
                    break;
                case '7-3':
                    return 28;
                    break;
                case '7-4':
                    return 29;
                    break;
                case '7-5':
                    return 30;
                    break;
                case '7-6':
                    return 31;
                    break;
                case '8-1':
                    return 32;
                    break;
                case '8-2':
                    return 33;
                    break;
                case '8-3':
                    return 34;
                    break;
                case '8-4':
                    return 35;
                    break;
                case '8-5':
                    return 36;
                    break;
                case '8-6':
                    return 37;
                    break;
                case '9-1':
                    return 38;
                    break;
                case '9-2':
                    return 39;
                    break;
                case '9-3':
                    return 40;
                    break;
                case '9-4':
                    return 41;
                    break;
                case '9-5':
                    return 42;
                    break;
                case '9-6':
                    return 43;
                    break;
                case '10-1':
                    return 44;
                    break;
                case '10-2':
                    return 45;
                    break;
                case '10-3':
                    return 46;
                    break;
                case '10-4':
                    return 47;
                    break;
                case '10-5':
                    return 48;
                    break;
                case '10-6':
                    return 49;
                    break;
                case '11-1':
                    return 50;
                    break;
                case '11-2':
                    return 51;
                    break;
                case '11-3':
                    return 52;
                    break;
                case '11-4':
                    return 53;
                    break;
                case '11-5':
                    return 54;
                    break;
                case '11-6':
                    return 55;
                    break;
                case '12-1':
                    return 56;
                    break;
                case '12-2':
                    return 57;
                    break;
                case '12-3':
                    return 58;
                    break;
                case '12-4':
                    return 59;
                    break;
                case '12-5':
                    return 60;
                    break;
                case '12-6':
                    return 61;
                    break;
                case '13-1':
                    return 62;
                    break;
                case '13-2':
                    return 63;
                    break;
                case '13-3':
                    return 64;
                    break;
                case '13-4':
                    return 65;
                    break;
                case '13-5':
                    return 66;
                    break;
                case '13-6':
                    return 67;
                    break;
                case '14-1':
                    return 68;
                    break;
                case '14-2':
                    return 69;
                    break;
                case '14-3':
                    return 70;
                    break;
                case '14-4':
                    return 71;
                    break;
                case '14-5':
                    return 72;
                    break;
                case '14-6':
                    return 73;
                    break;
                case '15-1':
                    return 74;
                    break;
                case '15-2':
                    return 75;
                    break;
                case '15-3':
                    return 76;
                    break;
                case '15-4':
                    return 77;
                    break;
                case '15-5':
                    return 78;
                    break;
                case '15-6':
                    return 79;
                    break;
                case '16-1':
                    return 80;
                    break;
                case '16-2':
                    return 81;
                    break;
                case '16-3':
                    return 82;
                    break;
                case '16-4':
                    return 83;
                    break;
                case '16-5':
                    return 84;
                    break;
                case '16-6':
                    return 85;
                    break;
                case '17-1':
                    return 86;
                    break;
                case '17-2':
                    return 87;
                    break;
                case '17-3':
                    return 88;
                    break;
                case '17-4':
                    return 89;
                    break;
                case '17-5':
                    return 90;
                    break;
                case '17-6':
                    return 91;
                    break;
                case '18-1':
                    return 92;
                    break;
                case '18-2':
                    return 93;
                    break;
                case '18-3':
                    return 94;
                    break;
                case '18-4':
                    return 95;
                    break;
                case '18-5':
                    return 96;
                    break;
                case '18-6':
                    return 97;
                    break;
                case '19-1':
                    return 98;
                    break;
                case '19-2':
                    return 99;
                    break;
                case '19-3':
                    return 100;
                    break;
                case '19-4':
                    return 101;
                    break;
                case '19-5':
                    return 102;
                    break;
                case '19-6':
                    return 103;
                    break;
                case '20-1':
                    return 104;
                    break;
                case '20-2':
                    return 105;
                    break;
                case '20-3':
                    return 106;
                    break;
                case '20-4':
                    return 107;
                    break;
                case '20-5':
                    return 108;
                    break;
                case '20-6':
                    return 109;
                    break;
                case '21-1':
                    return 110;
                    break;
                case '21-2':
                    return 111;
                    break;
                case '21-3':
                    return 112;
                    break;
                case '21-4':
                    return 113;
                    break;
                case '21-5':
                    return 114;
                    break;
                case '21-6':
                    return 115;
                    break;
                case '22-1':
                    return 116;
                    break;
            }

        }

    }
})();