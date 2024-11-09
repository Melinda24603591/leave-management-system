/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : vpndingwei

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 24/10/2024 19:11:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for leave_type
-- ----------------------------
DROP TABLE IF EXISTS `leave_type`;
CREATE TABLE `leave_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型名称',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '请假类型表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave_type
-- ----------------------------
INSERT INTO `leave_type` VALUES (3, '事假', NULL);
INSERT INTO `leave_type` VALUES (4, '婚假', NULL);
INSERT INTO `leave_type` VALUES (5, '病假', '2024-10-24 14:38:36');

-- ----------------------------
-- Table structure for leaves
-- ----------------------------
DROP TABLE IF EXISTS `leaves`;
CREATE TABLE `leaves`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL COMMENT '申请人',
  `type_id` int NULL DEFAULT NULL COMMENT '请假类型',
  `start_date` datetime NULL DEFAULT NULL COMMENT '开始日期',
  `end_date` datetime NULL DEFAULT NULL COMMENT '结束日期',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '0-待审批 1-已通过 2-已驳回',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '请假表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leaves
-- ----------------------------
INSERT INTO `leaves` VALUES (8, 1, 1, '2024-05-10 11:25:36', '2024-06-10 10:15:22', '1');
INSERT INTO `leaves` VALUES (9, 1, 4, '2024-10-20 00:00:00', '2024-10-28 00:00:00', '2');
INSERT INTO `leaves` VALUES (10, 2, 5, '2024-10-27 00:00:00', '2024-10-31 00:00:00', '1');
INSERT INTO `leaves` VALUES (11, 3, 4, '2024-10-20 00:00:00', '2024-10-25 00:00:00', '1');
INSERT INTO `leaves` VALUES (12, 2, 4, '2024-10-24 00:00:00', '2024-10-26 00:00:00', '0');

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL COMMENT '审判人id',
  `leave_id` int NULL DEFAULT NULL COMMENT '申请表id',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '审批日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES (1, 2, 2, '2024-10-24 14:10:06');
INSERT INTO `log` VALUES (2, 1, 2, '2024-10-24 14:49:36');
INSERT INTO `log` VALUES (3, 1, 8, '2024-10-24 16:51:37');
INSERT INTO `log` VALUES (4, 1, 8, '2024-10-24 16:52:14');
INSERT INTO `log` VALUES (5, 1, 8, '2024-10-24 16:52:54');
INSERT INTO `log` VALUES (6, 1, 8, '2024-10-24 16:53:04');
INSERT INTO `log` VALUES (7, 1, 8, '2024-10-24 17:00:17');
INSERT INTO `log` VALUES (8, 1, 9, '2024-10-24 17:13:50');
INSERT INTO `log` VALUES (9, 1, 8, '2024-10-24 18:56:03');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '账户',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '密码',
  `role` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '0管理员 1用户',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '电话',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '名称',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'username1', '123456', '1', '59494994@qq.com', '15555555555', '王老五', NULL);
INSERT INTO `user` VALUES (2, 'username2', '123456', '1', '5926262644@qq.com', '17777777777', '王德法', NULL);
INSERT INTO `user` VALUES (3, 'admin', 'admin', '0', NULL, NULL, '超级管理员', NULL);
INSERT INTO `user` VALUES (13, 'username3', '123456', '1', '595959@qq.com', '17888888888', '大旗网大旗网', NULL);

SET FOREIGN_KEY_CHECKS = 1;
